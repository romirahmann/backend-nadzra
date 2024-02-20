var express = require("express");
const cors = require("cors");
var router = express.Router();

// Import
const UserController = require("../../controller/master_controller/UserController");
const ApprovalAdmin = require("../../controller/master_controller/ApprovalAdminController");
const ApprovalPartner = require("../../controller/master_controller/ApprovalPartnerController");
const ReimbursementController = require("../../controller/master_controller/ReimbursementController");
const ClientController = require("../../controller/master_controller/ClientController");

router.use(cors());
// USER
router.get("/users", UserController.getAllUser);
router.post("/registrasi", UserController.addUser);
router.put("/user/:userID", UserController.updateUser);
router.get("/user/:id", UserController.getUserByUserId);

// Client
router.get("/clients", ClientController.getAllClient);
router.get("/client/:id", ClientController.getClientById);
router.post("/client", ClientController.addClient);
router.put("/client/:id", ClientController.updateClient);

// Reimbursement
router.get("/reimbursements", ReimbursementController.getAllReimbursement);
router.get("/reimbursement/:claimId", ReimbursementController.getClaimById);
router.get(
  "/filter-claim/:month/:year",
  ReimbursementController.getClaimByMonthYear
);
router.get("/total-claim/:id/:roleID", ReimbursementController.getTotalClaim);
router.get(
  "/reimbursement-user/:userID",
  ReimbursementController.getClaimByUserId
);
router.get(
  "/reimbursement-client/:userID/:category_id",
  ReimbursementController.getClaimByCategory
);
router.put("/reimbursement/:claimId", ReimbursementController.updateClaim);
router.post("/reimbursement", ReimbursementController.addClaim);

// Approval
// Admin
router.get("/approvals-admin", ApprovalAdmin.getAllAprovalAdmin);
router.get("/approval-admin/:claim_id", ApprovalAdmin.getByClaimId);
router.post("/approval-admin", ApprovalAdmin.addApproval);
router.put("/approval-admin/:approvalId", ApprovalAdmin.updateApproval);

// PartnersAproval
router.get("/approvals-partners", ApprovalPartner.getAllApprovalPartner);
router.put("/approval-partner/:id", ApprovalPartner.updateApproval);
router.post("/approval-partner", ApprovalPartner.addAproval);

module.exports = router;
