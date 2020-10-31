import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { INeedCreate } from "../interfaces/INeed";
import Need from "../models/Need";
import User from "../models/User";
import socket from "../socket";

export const findNeeds = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const needs = await Need.find().populate("user").sort({ createdAt: -1 });
    res.json({ data: needs, status: 1 });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const findNeed = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const need = await Need.findById(req.params.id).populate("user");

    if (!need) {
      const error: any = new Error("Not Found!");
      error.statusCode = 404;
      throw error;
    }
    res.json({ data: need, status: 1 });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const createNeed = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const io = socket.getIO();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error: any = new Error("Validation failed!");
      error.data = errors.array();
      error.statusCode = 422;
      throw error;
    }
    const needDto: INeedCreate = {
      body: req.body.body,
      header: req.body.header,
      tags: req.body.tags,
      user: req.userId,
    };
    const need = new Need(needDto);
    const result = await need.save();
    const user: any = await User.findById(req.userId);
    user?.needs.push(need);
    await user?.save();
    io.emit("needs");
    res
      .status(201)
      .json({ message: "Created Successfully!", data: result, status: 1 });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const updateNeed = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const io = socket.getIO();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error: any = new Error("Validation failed!");
      error.data = errors.array();
      error.statusCode = 422;
      throw error;
    }
    const need: any = await Need.findById(req.params.id);
    if (!need) {
      const error: any = new Error("Not Found!");
      error.statusCode = 404;
      throw error;
    }
    if (req.userId != need.user) {
      const error: any = new Error("Unauthorized!");
      error.statusCode = 401;
      throw error;
    }
    need.header = req.body.header;
    need.body = req.body.body;
    need.tags = req.body.tags;
    need.status = req.body.status ? "Satisfied" : "In progress";
    const result = await need.save();
    io.emit("needs");
    res.json({ message: "Updated Successfully!", data: result, status: 1 });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const removeNeed = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const io = socket.getIO();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error: any = new Error("Validation failed!");
      error.data = errors.array();
      error.statusCode = 422;
      throw error;
    }
    const need: any = await Need.findById(req.params.id);
    if (!need) {
      const error: any = new Error("Not Found!");
      error.statusCode = 404;
      throw error;
    }
    if (req.userId != need.user) {
      const error: any = new Error("Unauthorized!");
      error.statusCode = 401;
      throw error;
    }
    await Need.findByIdAndRemove(req.params.id);
    const user: any = await User.findById(req.userId);
    user.needs.pull(req.params.id);
    await user.save();
    io.emit("needs");
    res.sendStatus(204);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
