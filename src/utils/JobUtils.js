module.exports = {
    remainingDays(job){
        //calculo de tempo restante
        const reaimingDays = (job["total_hours"] / job["daily_hours"]).toFixed()

        const createdDate = new Date(job["createdAt"])
        const dueDay = createdDate.getDate() + Number(reaimingDays)
        const dueDate = createdDate.setDate(dueDay)

        const timeDiffInMs = dueDate - Date.now()
        const dayInMs = 1000 * 60 * 60 * 24
        const dayDiff = (timeDiffInMs/dayInMs).toFixed()

        return dayDiff
    },
    calculateBudget: (job,valueHour) => valueHour * job["total_hours"]
}