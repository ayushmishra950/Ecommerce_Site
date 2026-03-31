const express = require("express");
const router = express.Router();
const {  createBanner,
  getAllBanners,
    getActiveBanners,
    updateBanner,
    deleteBanner,
    changeBannerStatus,} = require("../../controllers/admin/banner.controller");



    router.post("/add", createBanner);
    router.get("/get", getAllBanners);
    router.get("/active", getActiveBanners);
    router.put("/update/:id", updateBanner);
    router.delete("/delete/:id", deleteBanner);
    router.patch("/status/:id", changeBannerStatus);


module.exports = router;