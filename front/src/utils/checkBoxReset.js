const checkBoxReset = (target) => {
    const checkBox = document.getElementsByName(target.name);
    checkBox.forEach((cb) => {
        cb.checked = false;
    })

    target.checked = true
}
export default checkBoxReset;