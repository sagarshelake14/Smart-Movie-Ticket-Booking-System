const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const Theatre = require("../models/theatreModel");

router.post("/add-theatre", authMiddleware, async (req, res) => {
  try {
    const newTheatre = new Theatre(req.body);

    await newTheatre.save();

    res.send({
      success: true,
      message: "Theatre added successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

router.get("/get-all-theatres", async (req, res) => {
    try {
        const theatres = await Theatre.find().sort({ createdAt: -1 });
        res.send({
            success: true,
            message: "Theatres fetched successfully",
            data: theatres,
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});

// Get all theatres by owner
router.post(
  "/get-all-theatres-by-owner",
  authMiddleware,
  async (req, res) => {
    try {
      const theatres = await Theatre.find({
        owner: req.body.owner,
      });

      res.send({
        success: true,
        message: "Theatres fetched successfully",
        data: theatres,
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  }
);

router.post("/update-theatre", async (req, res)=>{
    try {
            await Theatre.findByIdAndUpdate(req.body.theatreId, req.body);
            res.send({
                success: true,
                message: "Theatre updated successfully",
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});

module.exports = router