const Router = require("@koa/router");
const goalService = require("../service/goal");
const Joi = require("joi");
const validate = require("./_validation.js");
const { decode } = require("jsonwebtoken");
const { makeBannedRole, makeRequireRole, requireAuthentication } = require("../core/auth");
const Role = require("../core/roles")
const path = require("path");
const fs = require('fs-extra');
const multer = require("@koa/multer");
const mime = require('mime-types');

const limits = {
  fileSize: 4096 * 1024,
  files: 1
}

/**
 * * Finds and returns the goals in the database with the given parent
 * 
 * @param name
 * @returns {Object}
 * @see goalService.getGoalBySDGparentName
 * @exception Error occurred while fetching all goals with SDG-name
 */
const getGoalBySDGname = async (ctx) => {
  ctx.body = await goalService.getGoalBySDGparentName(
    ctx.request.params.name,
    decode(ctx.headers.authorization.substr(7)).roles[0]
  );
};
getGoalBySDGname.validationScheme = {
  params: {
    name: Joi.string(),
  },
};

/**
 * * Finds the goals with the given category name
 * 
 * @param name 
 * @returns {Object}
 * @see goalService.getGoalsBycategoryname
 * @exception Error occurred while fetching goals from category with name
 */
const getGoalsBycategoryname = async (ctx) => {
  ctx.body = await goalService.getGoalsBycategoryname(
    ctx.request.params.name,
    decode(ctx.headers.authorization.substr(7)).roles[0]
  );
};
getGoalsBycategoryname.validationScheme = {
  params: {
    name: Joi.string(),
  },
};

/**
 * * Finds the goals with the given category name and role id
 * 
 * @param roleId 
 * @param category  
 * @returns {Object} 
 * @see goalService.getGoalsByCategoryAndRole
 * @exception Error occurred while fetching goals with category for id
 */
const getGoalsByCategoryAndRole = async (ctx) => {
  ctx.body = await goalService.getGoalsByCategoryAndRole(
    ctx.request.params.roleId,
    ctx.request.params.category
  );
};
getGoalsByCategoryAndRole.validationScheme = {
  params: {
    roleId: Joi.string().uuid(),
    category: Joi.string()
  }
}

/**
 * * Finds and returns the goals with the given parent and role
 * 
 * @param roleId
 * @param parent  
 * @returns {Object} 
 * @see goalService.getGoalsByParentAndRole
 * @exception Error occurred while fetching goals with parent for role
 */
const getGoalsByParentAndRole = async (ctx) => {
  ctx.body = await goalService.getGoalsByParentAndRole(
    ctx.request.params.roleId,
    ctx.request.params.parent
  )
}
getGoalsByParentAndRole.validationScheme = {
  params: {
    roleId: Joi.string().uuid(),
    parent: Joi.string()
  }
}

/**
 * * Finds all the information of a given goalname
 * 
 * @param name
 * @returns {quarter, year, targetValue, currentValue}
 * @see goalService.getHistoryByGoalName
 * @exception You are not allowed to view this goal
 * @exception Error occurred while fetching history from goal with name
 */
const getHistoryByGoalName = async (ctx) => {
  ctx.body = await goalService.getHistoryByGoalName(
    ctx.request.params.name,
    decode(ctx.headers.authorization.substr(7)).roles[0]
  );
}
getHistoryByGoalName.validationScheme = {
  params: {
    name: Joi.string(),
  }
}

/**
 * Returns if the filename has the right extention 
 * 
 * @param fileName 
 * @returns {boolean} 
 */
const fileExt = (fileName) => {
  const extension = path.extname(fileName);
  return [".png", ".jpg", ".jpeg", ".webp"].includes(extension.toLowerCase());
};

/**
 * * Places an image in the storage
 * 
 * @see goalService.getGoalByName
 * @see fileExt
 * @exception File Extension isn't allowed
 * @exception Error occurred when trying to upload file skipping ...
 */
const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    const directory = path.join(__dirname, "../../public/");
    await fs.ensureDir(directory);
    cb(null, directory);
  },
  filename: async function (req, file, cb) {
    let error = null;
    const { id } = JSON.parse(req.headers.uploaddata);
    const iconId = (await goalService.getGoalById(id));

    if (!iconId) {
      error = {
        message: "that goal does not exist",
        status: 404
      }
      cb(error, "");
      return;
    }
    if (!fileExt(file.originalname)) {
      error = {
        message: "extension is not allowed",
        status: 400
      }
      cb(error, "");
      return;
    }
    let newFilename = iconId + path.extname(file.originalname);

    fs.readdirSync(path.join(__dirname, "../../public/")).forEach(function (file) {
      if (file.includes(iconId)) {
        fs.rmSync(path.join(__dirname, "../../public/" + file));
      }
    });

    await cb(error, newFilename);
    await goalService.updateGoalIcon(iconId, newFilename);
  },
});

/**
 * * Enables the users to upload images
 */
const uploader = multer({
  storage, limits
});

/**
 * * Returns the succesful status 201 
 */
const upload = async (ctx) => {
  ctx.status = 201;
};

/**
 * * Enables the users to download images
 * 
 * @param id 
 */
const download = async (ctx) => {
  const path = __dirname + '../../../public/' + ctx.request.params.id;
  var mimeType = mime.lookup(path);
  if (!fs.pathExistsSync(path)) {
    ctx.status = 404;
    return;
  }
  const src = fs.createReadStream(path);
  const stat = await fs.stat(path);
  ctx.response.set("content-lenght", stat.size);
  ctx.response.set("content-disposition", `filename="${ctx.request.params.id}"`);
  ctx.response.set("content-type", mimeType);
  ctx.body = src;
};
download.validationScheme = {
  params: {
    id: Joi.string(),
  }
}

/**
 * * Deletes an Icon from the storage
 * 
 * @param id
 */
const deleteIcon = async (ctx) => {
  fs.removeSync(__dirname + '../../../public/' + ctx.request.params.id);
  ctx.body = await goalService.updateGoalIcon(ctx.params.id, null);
}
deleteIcon.validationScheme = {
  params: {
    id: Joi.string(),
  }
}

/**
 * * Finds and returns all the goals that have been reached
 * 
 * @returns {id, name, category}
 * @see goalService.getReachedGoals
 * @exception Error occurred while fetching goals who have been reached
 */
const getReachedGoals = async (ctx) => {
  ctx.body = await goalService.getReachedGoals(decode(ctx.headers.authorization.substr(7)));
}
getReachedGoals.validationScheme = null;


module.exports = (app) => {
  const router = new Router({ prefix: "/goal" });

  router.get(
    "/children/:name",
    requireAuthentication,
    makeBannedRole(Role.User),
    validate(getGoalBySDGname.validationScheme),
    getGoalBySDGname
  );
  router.get(
    "/category/:name",
    requireAuthentication,
    validate(getGoalsBycategoryname.validationScheme),
    getGoalsBycategoryname
  );
  router.get(
    "/roles/:roleId/:category",
    requireAuthentication,
    makeRequireRole(Role.MVOcoördinator),
    validate(getGoalsByCategoryAndRole.validationScheme),
    getGoalsByCategoryAndRole
  );
  router.get(
    "/parents/:roleId/:parent",
    requireAuthentication,
    makeRequireRole(Role.MVOcoördinator),
    validate(getGoalsByParentAndRole.validationScheme),
    getGoalsByParentAndRole
  );
  router.get(
    "/history/:name",
    requireAuthentication,
    validate(getHistoryByGoalName.validationScheme),
    getHistoryByGoalName
  );
  router.post(
    "/upload/icon",
    requireAuthentication,
    makeRequireRole(Role.MVOcoördinator),
    uploader.single("file"),
    upload
  );
  router.get(
    "/download/:id",
    validate(download.validationScheme),
    download
  );
  router.delete(
    "/icon/:id",
    requireAuthentication,
    makeRequireRole(Role.MVOcoördinator),
    validate(deleteIcon.validationScheme),
    deleteIcon
  );
  router.get(
    "/reachedgoals",
    requireAuthentication,
    validate(getReachedGoals.validationScheme),
    getReachedGoals
  );
  app.use(router.routes()).use(router.allowedMethods());
};