const intakeInfo = {
    currentIntake: {
        startDate: "January 30, 2025",
        applicationDeadline: "January 24, 2025",
        isClosed: false
    }
};

export const isApplicationOpen = () => {
    const now = new Date();
    const deadline = new Date(intakeInfo.currentIntake.applicationDeadline);
    return now <= deadline && !intakeInfo.currentIntake.isClosed;
};

export default intakeInfo; 