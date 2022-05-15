const goalRepository = require("../repository/goal");
const { getChildLogger } = require("../core/logging");
const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getChildLogger("goal-service");
  this.logger.debug(message, meta);
};

/**
 * * Finds and returns the goals in the database with the given parent
 * 
 * @param name
 * @param rolename
 * @returns {Object}
 * @see goalRepository.findRoleId
 * @see goalRepository.findGoalBySDGparentName
 * @see goalRepository.findParentUrl
 * @exception Error occurred while fetching all goals with SDG-name
 */
const getGoalBySDGparentName = async (name, rolename) => {
  try {
    debugLog(`Fetching all goals with SDG-name: ${name} ${rolename}`);
    const roleId = (await goalRepository.findRoleId(rolename)).id;
    const data = await goalRepository.findGoalBySDGparentName(name, roleId);
    const mappedData = await Promise.all(
      data.map(async (d) => {
        const urlColor = (await goalRepository.findParentUrl(d.parentId))[0][0];
        d.url = urlColor.url;
        d.color = urlColor.color;
        return d;
      })
    )
    return mappedData;
  } catch (error) {
    throw Error(
      `Error occurred while fetching all goals with SDG-name: ${name}`
    );
  }
};

/**
 * * Finds the goals with the given category name
 * 
 * @param name 
 * @param rolename 
 * @returns {Object}
 * @see goalRepository.findRoleId
 * @see goalRepository.findGoalByCategoryname
 * @exception Error occurred while fetching goals from category with name
 */
const getGoalsBycategoryname = async (name, rolename) => {
  try {
    debugLog(`Fetching goals from category with name ${name}`);
    const roleId = (await goalRepository.findRoleId(rolename)).id;
    return await goalRepository.findGoalByCategoryname(name, roleId);
  } catch (error) {
    throw Error(
      `Error occurred while fetching goals from category with name ${name}`
    );
  }
};

/**
 * * Finds the goals with the given category name and role id
 * 
 * @param id 
 * @param category 
 * @returns {Object} 
 * @see goalRepository.findGoalsByCategory
 * @see goalRepository.findGoalsByCategoryAndRole
 * @see goalRepository.hasChildren
 * @exception Error occurred while fetching goals with category for id
 */
const getGoalsByCategoryAndRole = async (id, category) => {
  try {
    debugLog(
      `Fetching goals from category with name ${category} with roleId ${id}`
    );
    if (!await goalRepository.roleExists(id)) return ServiceError.notFound(`Can't find role-id ${id}`);
    if (!await goalRepository.categoryExists(category)) return ServiceError.notFound(`Can't find category ${category}`);
    const data = await goalRepository.findGoalsByCategory(category);
    const mappedData = await Promise.all(
      data.map(async (d) => {
        const options = await goalRepository.findGoalsByCategoryAndRole(
          id, category, d.id
        );
        d.hasChildren = await goalRepository.hasChildren(d.id) !== undefined;
        try {
          if (options[0].id)
            d.visible = 1
          else
            d.visible = 0
          return d;
        } catch (error) {
          d.visible = 0
          return d
        }
      })
    )
    return mappedData;
  } catch (error) {
    throw Error(
      `Error occurred while fetching goals with category ${category} for ${id}`
    );
  }
};

/**
 * * Finds and returns the goals with the given parent and role
 * 
 * @param id
 * @param name  
 * @returns {Object} 
 * @see goalRepository.findGoalsByParent
 * @see goalRepository.findGoalsByParentAndRole
 * @see goalRepository.hasChildren
 * @exception Error occurred while fetching goals with parent for role
 */
const getGoalsByParentAndRole = async (id, name) => {
  try {
    debugLog(`Fetching goals from parent with name ${name} with roleId ${id}`);
    if (!await goalRepository.roleExists(id)) return ServiceError.notFound(`Can't find role-id ${id}`);
    if ((await goalRepository.findGoal(name))?.name === undefined) return ServiceError.notFound(`Can't find category ${name}`);
    const data = await goalRepository.findGoalsByParent(name);
    const mappedData = await Promise.all(
      data.map(async (d) => {
        const options = await goalRepository.findGoalsByParentAndRole(
          id, name, d.id
        );
        d.hasChildren = await goalRepository.hasChildren(d.id) !== undefined;
        try {
          if (options[0].id)
            d.visible = 1
          else
            d.visible = 0
          return d;
        } catch (error) {
          d.visible = 0
          return d
        }
      })
    )
    return mappedData;
  } catch (error) {
    throw Error(
      `Error occurred while fetching goals with parent ${name} for role ${id}`
    );
  }
};

/**
 * * Filters and joins all the elements properly in quarters
 * 
 * @param array 
 * @returns {Object}  
 */
const help = (array) => {
  const values = new Map;
  array[0].forEach(element => {
    let key = `${element.id}-${element.year}-${element.quarter}`;
    if (values.get(key) == undefined) {
      values.set(key, element);
    } else if (values.get(key).date < element.date) {
      values.set(key, element);
    }
  });
  return [...values.values()].reverse();
}

/**
 * * Finds all the information of a given goalname
 * 
 * @param name 
 * @param rolename 
 * @returns {quarter, year, targetValue, currentValue}
 * @see goalRepository.findRoleId
 * @see goalRepository.findGoalByGoalName
 * @see goalRepository.findGoal
 * @see goalRepository.hasChildren
 * @see goalRepository.findAllPlaceholder
 * @see goalRepository.findAllChildren
 * @see help
 * @exception You are not allowed to view this goal
 * @exception Error occurred while fetching history from goal with name
 */
const getHistoryByGoalName = async (name, rolename) => {
  try {
    debugLog(`Fetching history from goal with name ${name}`);

    const roleId = (await goalRepository.findRoleId(rolename)).id;
    if ((await goalRepository.findGoalByGoalName(name, roleId))?.length < 1)
      throw Error("You are not allowed to view this goal");

    const goal = await goalRepository.findGoal(name);

    if ((await goalRepository.hasChildren(goal.id)) === undefined) {
      const data = await goalRepository.findAllPlaceholder(goal.id);
      return { name, yAxisName: goal.valueAxisName, data: help(data) };
    }

    const children = await goalRepository.findAllChildren(goal.id);
    const all = help(children);

    const returnValue = new Map();
    all.forEach((value) => {
      let key = `${value.quarter}-${value.year}`;
      if (returnValue.get(key) === undefined) {
        returnValue.set(key, {
          quarter: value.quarter,
          year: value.year,
          targetValue: value.targetValue,
          currentValue: value.currentValue
        });
      } else {
        let newTargetValue = value.targetValue + returnValue.get(key).targetValue;
        let newCurrentValue = value.currentValue + returnValue.get(key).currentValue;
        returnValue.set(key, {
          quarter: value.quarter,
          year: value.year,
          targetValue: newTargetValue,
          currentValue: newCurrentValue
        });
      }
    });
    return { name, yAxisName: goal.valueAxisName, data: [...returnValue.values()] };
  } catch (error) {
    throw Error(
      `Error occurred while fetching history from goal with name ${name}`
    );
  }
};

/**
 * * Finds and returns the name of a goal
 * 
 * @param name 
 * @returns {name}
 * @see goalRepository.findGoal
 * @exception Error occurred while fetching goal with name
 */
const getGoalById = async (id) => {
  try {
    debugLog(`Fetching goal with id ${id}`);
    const goal = await goalRepository.findGoalById(id);
    return goal?.id;
  } catch (error) {
    throw Error(`Error occurred while fetching goal with id ${id}`);
  }
}

/**
 * * updates goal Icon
 * 
 * @param name 
 * @param bool
 * @see goalRepository.updateGoalIcon
 * @exception Error occurred while updating goal ... to 
 */
const updateGoalIcon = async (id, fileName) => {
  try {
    debugLog(`updating goal with id ${id}`);
    return await goalRepository.updateGoalIcon(id, fileName);
  } catch (error) {
    throw Error(`Error occurred while updating goal with id ${id}`);
  }
}

/**
 * * Finds and returns all the goals that have been reached
 * 
 * @param userId 
 * @param roles
 * @returns {id, name, category}
 * @see goalRepository.getReachedGoals
 * @exception Error occurred when fetching reached goals for userId
 */
const getReachedGoals = async ({ userId, roles }) => {
  try {
    debugLog(`fetching reached goals for userId ${userId}`);
    return (await goalRepository.getReachedGoals(userId, roles[0]))[0];
  } catch (error) {
    throw Error(
      `Error occurred when fetching reached goals for userId ${userId}`
    );
  }
};

module.exports = {
  getGoalBySDGparentName,
  getGoalsBycategoryname,
  getGoalsByCategoryAndRole,
  getGoalsByParentAndRole,
  getHistoryByGoalName,
  getGoalById,
  updateGoalIcon,
  getReachedGoals
};
