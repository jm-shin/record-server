const divCommon = {
    default:`
        display: block;
    `,
    flexCenter:`
        display: flex;
        justify-content: center;
    `,
    flexCenterCenter:`
        display: flex;
        justify-content: center;
        align-items: center;
    `,
    flexColumn:`
        display: flex;
        flex-direction: column;
    `,
    flexColumnCenter:`
        display: flex;
        flex-direction: column;
        justify-content: center;
    `,
    flexColumnCenterCenter:`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    `,
}

const fontFamily = {
    jua:`
        font-family: 'Jua', sans-serif;
    `
}

const theme = {
    divCommon,
    fontFamily
}

export default theme;