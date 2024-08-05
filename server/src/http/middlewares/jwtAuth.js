import userService from "#src/services/user.service.js";
import ApiErrorUtils from "#src/utils/ApiErrorUtils.js";
import JwtUtils from "#src/utils/JwtUtils.js";

function authorized() {
  return [
    // Authenticate JWT token and attach user to req.user
    JwtUtils.jwtMiddleware,
    async (req, res, next) => {
      const user = await userService.getOneById(req.user._id, "_id");
      if (!user) {
        return next(
          ApiErrorUtils.simple("Unauthorized: User doesn't exist !", 401)
        );
      }

      next();
    },
  ];
}

export const isAuthorized = authorized();
