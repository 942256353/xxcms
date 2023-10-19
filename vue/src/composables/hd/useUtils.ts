import _ from "lodash";


export default () => {
    const  generateRandomColor = () => {
        const red = _.random(0, 255);
        const green = _.random(0, 255);
        const blue = _.random(0, 255);

        return `rgb(${red}, ${green}, ${blue})`;
    }
    return{
        generateRandomColor
    }
}
