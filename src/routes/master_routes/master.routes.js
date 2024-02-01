var express = require("express");
var router = express.Router();

// Import
const UserController = require("../../controller/master_controller/UserController");
const ApprovalAdmin = require("../../controller/master_controller/ApprovalAdminController");
const ApprovalPartner = require("../../controller/master_controller/ApprovalPartnerController");
const ReimbursementController = require("../../controller/master_controller/ReimbursementController");

// USER
router.get("/users", UserController.getAllUser);
router.post("/registrasi", UserController.addUser);

// Reimbursement
router.get("/reimbursements", ReimbursementController.getAllReimbursement);
router.get("/reimbursement/:claimId", ReimbursementController.getClaimById);
router.put("/reimbursement/:claimId", ReimbursementController.updateClaim);
router.post("/reimbursement", ReimbursementController.addClaim);

// Approval
// Admin
router.get("/approvals-admin", ApprovalAdmin.getAllAprovalAdmin);
router.post("/approval-admin", ApprovalAdmin.addApproval);
router.put("/approval-admin/:approvalId", ApprovalAdmin.updateApproval);

// PaddAproval
router.get("/approvals-partners", ApprovalPartner.getAllApprovalPartner);
router.post("/approval-partner", ApprovalPartner.addAproval);

module.exports = router;
