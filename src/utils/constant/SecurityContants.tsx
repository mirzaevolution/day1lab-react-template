export const SecurityPipeline = {
    IV:`${process.env.REACT_APP_SEC_IV}`,
    SALT:`${process.env.REACT_APP_SEC_SALT}`,
    PASSWORD:`${process.env.REACT_APP_SEC_PASSWORD}`
}