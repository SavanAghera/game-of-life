const cc = document.getElementById('gameBoard').getContext('2d');
cc.fillStyle = 'black'
const canvasLength = 600
cc.fillRect(0, 0, canvasLength, canvasLength);
cc.fillStyle = 'red'

const size = 5
const xLength = canvasLength / size

const lifeObj = {}
function render() {

    for (let x = 0; x < canvasLength; x += size) {
        for (let y = 0; y < canvasLength; y += size) {
            const value = Math.random() > 0.96 ? 1 : 0 
            lifeObj[`${x},${y}`] = value;
            if (value) {
                cc.fillRect(x, y, size, size)
            }
        }
    }

}
render();
function update() {
    cc.fillStyle = 'black'
    cc.fillRect(0, 0, canvasLength, canvasLength);
    cc.fillStyle = 'red'

    for (const key in lifeObj) {
        const split = key.split(',');
        const count = countOfNeighbours(parseInt(split[0]), parseInt(split[1]), lifeObj[key]);
        if (count < 2 || count > 3) {
            lifeObj[key] = 0
        } else if (count === 3 && !lifeObj[key]) {
            lifeObj[key] = 1
        }

        if(lifeObj[key]) {
            cc.fillRect(split[0], split[1], size, size)
        }
    }
}
update()
setInterval(() => update(), 1)
function countOfNeighbours(x, y) {
   const arr = [  lifeObj[`${x + size},${y}`] , lifeObj[`${x - size},${y}`]
    , lifeObj[`${x + size},${y - size}`] , lifeObj[`${x},${y - size}`] , lifeObj[`${x - size},${y - size}`]
    , lifeObj[`${x + size},${y + size}`] , lifeObj[`${x},${y + size}`] , lifeObj[`${x - size},${y + size}`]]
    return arr.map(v => v === undefined ? 0 : v).reduce((acc, v) => acc + v,0);
}