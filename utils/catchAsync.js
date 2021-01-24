module.exports = asyncfn => {
    return function (req, res, next) {
        asyncfn(req, res, next).catch(e => next(e));
    }
}