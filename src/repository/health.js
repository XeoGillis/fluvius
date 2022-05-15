const { tables, getKnex } = require("../data");

/**
 * * Finds the sdg id for the given category
 * 
 * @param category 
 * @returns {id}
 * @exception ""
 */
const findSdgIds = async (category) => {
    try {
        return await getKnex()(tables.SDG)
            .select(`${tables.SDG}.id`)
            .join(
                tables.Category,
                `${tables.SDG}.categoryId`,
                `${tables.Category}.id`
            )
            .where(`${tables.Category}.name`, category);
    } catch (error) {
        return;
    }
}

/**
 * * Finds the goal id for the given name
 * 
 * @param headGoal 
 * @returns {id}
 * @exception ""
 */
const findHeadgoalId = async (headGoal, sdgIds) => {
    try {
        return await getKnex()(tables.Goal)
            .select(`${tables.Goal}.id`)
            .whereIn("sdgId", sdgIds)
            .and.where("name", headGoal)
            .and.where("parentId", null).first();
    } catch (error) {
        return;
    }
}

/**
 * * Finds the goal id for the given name and parent
 * 
 * @param category 
 * @returns {id}
 * @exception ""
 */
const findResponse = async (parentId, goalName) => {
    try {
        return await getKnex()(tables.Goal)
            .select(`${tables.Goal}.id`)
            .and.where("name", goalName)
            .and.where("parentId", parentId)
            .first();
    } catch (error) {
        return;
    }
}

module.exports = {
    findSdgIds,
    findHeadgoalId,
    findResponse
};
