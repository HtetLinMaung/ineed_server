"use strict";
// async (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) => {
//     try {
//       const errors = validationResult(req);
//       if (!errors.isEmpty) {
//         const error: any = new Error("Validation failed!");
//         error.data = errors.array();
//         error.statusCode = 422;
//         throw error;
//       }
//     } catch (err) {
//       if (!err.statusCode) {
//         err.statusCode = 500;
//       }
//       next(err);
//     }
//   }
//# sourceMappingURL=NeedController.js.map