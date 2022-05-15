const { tables, getKnex } = require("../data");

/**
 * * Joins Goal, SDG, Category and PersonalTemplate and returns what is needed
 * The number of objects returned is filtered by the params
 * 
 * @param roleId 
 * @param parent 
 * @param value 
 * @param name 
 * @returns {Object} 
 */
const help = async (roleId, parent, value, name) => {
  return await getKnex()(tables.Goal)
    .select(
      `${tables.Goal}.id`,
      `${tables.Goal}.name`,
      `${tables.Goal}.sdgId`,
      `${tables.Goal}.subSdgId`,
      `${tables.Goal}.parentId`,
      `${tables.Goal}.IconName`,
      `${tables.SDG}.title`,
      `${tables.SDG}.url`,
      `${tables.Category}.color`,
      getKnex().raw(`COALESCE(${tables.PersonalTemplate}.interested,1) as interested`),
    )
    .leftJoin(
      tables.TemplateGoal,
      `${tables.TemplateGoal}.goalId`,
      `${tables.Goal}.id`
    )
    .leftJoin(
      tables.PersonalTemplate,
      `${tables.PersonalTemplate}.templateGoalId`,
      `${tables.TemplateGoal}.id`
    )
    .leftJoin(
      tables.SDG,
      `${tables.SDG}.id`,
      `${tables.Goal}.sdgId`
    )
    .leftJoin(
      tables.Category,
      `${tables.Category}.id`,
      `${tables.SDG}.categoryId`
    )
    .where(
      `${tables.TemplateGoal}.templateId`,
      getKnex()(tables.Template)
        .select("id")
        .where("roleId", roleId)
    )
    .and.where(`${tables.Goal}.parentId`, parent)
    .and.where(`${tables.TemplateGoal}.canView`, true)
    .and.where(value, name)
}

/**
 * * Finds and returns the goals in the database with the given parent
 * 
 * @param name 
 * @param roleId 
 * @returns {Object}
 */
const findGoalBySDGparentName = async (name, roleId) => {
  return await help(
    roleId,
    getKnex()(tables.Goal)
      .select("id")
      .where("name", name),
    1,
    1
  );
};

/**
 * * Finds the very first child of a goal and is used as a boolean 
 * 
 * @param id 
 * @returns {Object}
 */
const hasChildren = async (id) => {
  return await getKnex()(tables.Goal)
    .select()
    .where("parentId", id)
    .first();
}

/**
 * * Finds and returns the url and color in the database with the given id
 * 
 * @param id 
 * @returns {url, color}
 */
const findParentUrl = async (id) => {
  return await getKnex().raw(`
    SELECT s.url, c.color
    FROM ${tables.Goal} g
      JOIN ${tables.SDG} s ON s.id = g.sdgId
      JOIN ${tables.Category} c ON c.id = s.categoryId
    WHERE url IS NOT NULL AND g.id = '${id}'
  `)
}

/**
 * * Finds the goals with the given category name
 * 
 * @param name 
 * @param roleId 
 * @returns {Object}
 */
const findGoalByCategoryname = async (name, roleId) => {
  return await help(roleId, null, `${tables.Category}.name`, name);
};

/**
 * * Finds the goals with the given category, role and id
 * 
 * @param roleId 
 * @param category 
 * @param id 
 * @returns {Object}
 */
const findGoalsByCategoryAndRole = async (roleId, category, id) => {
  return await getKnex()(tables.Goal)
    .select(`${tables.TemplateGoal}.id`)
    .join(
      tables.TemplateGoal,
      `${tables.TemplateGoal}.goalId`,
      `${tables.Goal}.id`
    )
    .join(
      tables.Template,
      `${tables.Template}.id`,
      `${tables.TemplateGoal}.templateId`
    )
    .join(
      tables.Role,
      `${tables.Template}.roleId`,
      `${tables.Role}.id`
    )
    .join(
      tables.SDG,
      `${tables.SDG}.id`,
      `${tables.Goal}.sdgId`
    )
    .join(
      tables.Category,
      `${tables.Category}.id`,
      `${tables.SDG}.categoryId`
    )
    .where(`${tables.Role}.id`, roleId)
    .where(`${tables.Category}.name`, category)
    .where(`${tables.Goal}.id`, id)
    .where(`${tables.TemplateGoal}.canView`, true);
}

/**
 * * Finds the goals with the given category name and role id
 * 
 * @param  category 
 * @returns {Object}
 */
const findGoalsByCategory = async (category) => {
  return await getKnex()(tables.Goal)
    .select(`${tables.Goal}.*`, `${tables.SDG}.url`)
    .join(
      tables.SDG,
      `${tables.SDG}.id`,
      `${tables.Goal}.sdgId`
    )
    .join(
      tables.Category,
      `${tables.Category}.id`,
      `${tables.SDG}.categoryId`
    )
    .where(`${tables.Category}.name`, category);
}

/**
 * * Finds and returns the ids of the templategoals after filtering
 * 
 * @param roleId 
 * @param name 
 * @param id 
 * @returns {id}
 */
const findGoalsByParentAndRole = async (roleId, name, id) => {
  return await getKnex()(tables.Goal)
    .select(`${tables.TemplateGoal}.id`)
    .join(
      tables.TemplateGoal,
      `${tables.TemplateGoal}.goalId`,
      `${tables.Goal}.id`
    )
    .join(
      tables.Template,
      `${tables.Template}.id`,
      `${tables.TemplateGoal}.templateId`
    )
    .join(
      tables.Role,
      `${tables.Template}.roleId`,
      `${tables.Role}.id`
    )
    .where(`${tables.Role}.id`, roleId)
    .where(`${tables.Goal}.id`, id)
    .where(
      `${tables.Goal}.parentId`,
      getKnex()(tables.Goal).select("id")
        .where("name", name)
    )
    .where(`${tables.TemplateGoal}.canView`, true);
}

/**
 * * Finds and returns the goals with the given parent
 * 
 * @param name 
 * @returns {Object} 
 */
const findGoalsByParent = async (name) => {
  return await getKnex()(tables.Goal)
    .select()
    .where(
      `parentId`,
      getKnex()(tables.Goal).select("id")
        .where("name", name)
    );
}

/**
 * * Returns the name and the id of the goal
 * 
 * @param name 
 * @returns {id, name} 
 */
const findGoal = async (name) => {
  return await getKnex()(tables.Goal)
    .select("id", "name", "valueAxisName")
    .where("name", name)
    .first();
}

const findGoalById = async (id) => {
  return await getKnex()(tables.Goal)
    .select("id")
    .where("id", id)
    .first();
}

/**
 * * Returns the goals, filtered by name and role id
 * 
 * @param name 
 * @param roleId 
 * @returns {Object} 
 */
const findGoalByGoalName = async (name, roleId) => {
  return await getKnex()(tables.Goal)
    .select()
    .leftJoin(
      tables.TemplateGoal,
      `${tables.TemplateGoal}.goalId`,
      `${tables.Goal}.id`
    )
    .where(
      `${tables.TemplateGoal}.templateId`,
      getKnex()(tables.Template)
        .select("id")
        .where("roleId", roleId)
    )
    .and.where(`${tables.TemplateGoal}.canView`, true)
    .and.where(`${tables.Goal}.name`, name);
};

/**
 * * Finds and returns the id in the database with the given rolename
 * 
 * @param rolename 
 * @returns {id} 
 */
const findRoleId = async (rolename) => {
  return await getKnex()(tables.Role)
    .select("id")
    .where("name", rolename)
    .first();
}

/**
 * * Finds and returns the goalId and name of the two most recent goals
 * 
 * @returns {goalId, name}
 */
const findRecentGoals = async () => {
  return await getKnex().raw(`
    SELECT goalId, g.name
    FROM valuehistory v
      JOIN goal g ON g.id = v.goalId
    ORDER BY date DESC
    LIMIT 2
  `)
}

/**
 * * Returns all the necessary information from a given goal id
 * 
 * @param goalId 
 * @returns {targetValue, currentValue, date, year, quarter} 
 */
const findAllPlaceholder = async (goalId) => {
  return await getKnex().raw(`
    SELECT 
      (targetValue * weight) AS targetValue, 
      (currentValue *  weight) AS currentValue, 
      date, 
      YEAR(date) AS year,
      QUARTER(date) AS quarter
    FROM ${tables.ValueHistory}
    WHERE goalId = '${goalId}'
    ORDER BY date DESC
  `)
}

/**
 * * Returns all the necessary information from a given id
 * 
 * @param id 
 * @returns {id, targetValue, currentValue, date, year, quarter} 
 */
const findAllChildren = async (id) => {
  return await getKnex().raw(`
    SELECT 
      id, 
      (targetValue * weight) AS targetValue, 
      (currentValue * weight) AS currentValue, 
      date, 
      YEAR(date) AS year,
      QUARTER(date) AS quarter
    FROM ${tables.Goal} g 
      JOIN ${tables.ValueHistory} v ON g.id = v.goalId
    WHERE g.parentId = '${id}'
    ORDER BY date DESC
  `)
}

/**
 * * updates goal icon with name
 * @param name 
 * @param bool 
 */
const updateGoalIcon = async (id, fileName) => {
  return await getKnex()(tables.Goal).where("id", id).update({ IconName: fileName });
}

/**
 * * Returns all the necessary information from a reached goal
 * 
 * @param userId
 * @param rolename
 * @returns {id, name, category} 
 */
const getReachedGoals = async (userId, rolename) => {
  return await getKnex()
    .raw(`
    select g.id, g.name, c.name as category
    from valuehistory v 
    join goal g on v.goalId = g.id
    left join templategoal tg on g.id = tg.goalId
    left join personaltemplate pt on tg.id = pt.templateGoalId
    left join sdg sdg on sdg.id = g.sdgId
    left join category c on c.id = sdg.categoryId
    where date = (select max(date) from valuehistory v1 join goal g1 on v1.goalId = g1.id where g1.id = g.id)
    and g.parentId is null
    and tg.templateId = (select t.id from template t join role r on t.roleId = r.id where name = "${rolename}")
    and (pt.userId = "${userId}" or pt.userId is null)
    and g.parentId is null
    and tg.canView = 1
    and coalesce(pt.interested , 1) = 1
    and coalesce(v.currentValue, (select sum(currentValue * weight)
    from valuehistory v2 join goal g2 on v2.goalId = g2.id
    where g2.parentId = g.id and date = v.date)) 
    >= 
    coalesce(v.targetValue, (select sum(targetValue * weight)
    from valuehistory v3 join goal g3 on v3.goalId = g3.id
    where g3.parentId = g.id and date = v.date))
    group by g.id
  `)
}

/**
 * * Returns wether a role exists or not
 * 
 * @param roleId
 */
const roleExists = async (roleId) => {
  return (await getKnex()(tables.Role).select("id").where("id", roleId).first())?.id !== undefined;
}
/**
 * * Returns wether a category exists or not
 * 
 * @param categoryname
 */
const categoryExists = async (categoryname) => {
  return (await getKnex()(tables.Category).select("id").where("name", categoryname).first())?.id !== undefined;
}


module.exports = {
  findGoalBySDGparentName,
  findGoalByCategoryname,
  findGoalsByCategoryAndRole,
  findGoalsByCategory,
  findGoalsByParentAndRole,
  findGoalsByParent,
  findGoal,
  findRoleId,
  findGoalByGoalName,
  findRecentGoals,
  findAllPlaceholder,
  findParentUrl,
  hasChildren,
  findAllChildren,
  updateGoalIcon,
  getReachedGoals,
  roleExists,
  categoryExists,
  findGoalById
};
