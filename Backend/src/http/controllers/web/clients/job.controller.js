const Job = require("../../../../models/job.model");
const { homeRoute } = require("../../../../config/routes");
const { setSessions } = require("../../../../utils/session");
const { verifyToken } = require("../../../../utils/jwt");

module.exports = {
  handleAdd: async (req, res) => {
    const job = req.body?.job;

    if (!job) {
      setSessions(req, {
        message: {
          type: "danger",
          text: "Job is required",
        },
      });
      return res.redirect(homeRoute);
    }

    try {
      const { data } = verifyToken(req.cookies?.token);
      await Job.create({
        title: job,
        userId: data.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      setSessions(req, {
        message: {
          type: "success",
          text: "Add job successful!",
        },
      });

      return res.redirect(homeRoute);
    } catch (e) {
      setSessions(req, {
        message: {
          type: "danger",
          text: "Add job failed!",
        },
      });
      return res.redirect(homeRoute);
    }
  },

  handleEdit: async (req, res) => {
    const { job = null, jobId = null } = req.body;

    if (!jobId) {
      setSessions(req, {
        message: {
          type: "danger",
          text: "Job not found",
        },
      });
      return res.redirect(homeRoute);
    }

    if (!job) {
      setSessions(req, {
        message: {
          type: "danger",
          text: "Job is required",
        },
      });
      return res.redirect(homeRoute);
    }

    try {
      await Job.findOneAndUpdate(
        {
          _id: jobId,
        },
        {
          title: job,
          updatedAt: new Date(),
        }
      );

      setSessions(req, {
        message: {
          type: "success",
          text: "Edit job successful!",
        },
      });

      return res.redirect(homeRoute);
    } catch (e) {
      setSessions(req, {
        message: {
          type: "danger",
          text: "Edit job failed!",
        },
      });
      return res.redirect(homeRoute);
    }
  },

  handleDelete: async (req, res) => {
    const { jobId = null } = req.body;

    if (!jobId) {
      setSessions(req, {
        message: {
          type: "danger",
          text: "Job not found",
        },
      });
      return res.redirect(homeRoute);
    }

    try {
      await Job.findOneAndDelete({
        _id: jobId,
      });

      setSessions(req, {
        message: {
          type: "success",
          text: "Delete job successful!",
        },
      });

      return res.redirect(homeRoute);
    } catch (e) {
      setSessions(req, {
        message: {
          type: "danger",
          text: "Delete job failed!",
        },
      });
      return res.redirect(homeRoute);
    }
  },
};
