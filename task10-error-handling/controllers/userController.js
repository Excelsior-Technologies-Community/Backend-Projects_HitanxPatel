exports.testError = async (req, res, next) => {

    try {
        throw new Error("Something went wrong");
    } catch (error) {
        next(error);
    }

};