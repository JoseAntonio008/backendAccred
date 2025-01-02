const { ReportAr} = require("../models")
const { Op } = require("sequelize");

const fetchAdmin = async ({}) => {
    try {
        const results = await ReportAr.findAll({
            attributes: { exclude: ['fileData'] },
        });
        if(results.length == 0) {
            return {
                message:"no reports found"
            }
        }
        return{
            message:"fetch successfully",
            data:results
        }
    } catch (error) {
        return {
            message:"error occured",
            error:error.message
        }
    }
}
const fetchUser = async ({department}) => {
    try {
        const results = await ReportAr.findAll({
            attributes: { exclude: ['fileData'] },
            where:{
                department:{ [Op.in]:department}
            }
        })
        if(results.length == 0) {
            return {
                message:"no reports found",
                status:"success",
                data:"empty"
            }
        }
        return{
            message:"fetch successfully",
            status:"success",
            data:results
        }
        
    } catch (error) {
        return {
            message:"error occured",
            error:error.message
        }
    }
    
}
module.exports = {
    fetchAdmin,
    fetchUser
}