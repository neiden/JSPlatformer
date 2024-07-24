

class Tile{
    constructor(x, y, tilesetX, tilesetY, size, type){
        this.x = x;
        this.y = y;
        this.tilesetX = tilesetX;
        this.tilesetY = tilesetY;
        this.size = size;
        this.type = type;
    }

    render(ctx, img){
        ctx.drawImage(img, this.tilesetX, this.tilesetY, this.size, this.size, this.x, this.y, this.size, this.size);
    }




}

class TileMap{
    constructor(img, tileData, tileSize, x, y){
        this.tileData = tileData;
        this.tileSize = tileSize;
        this.img = new Image();
        this.img.src = img;
        this.tiles = [];
        this.x = x;
        this.y = y;

        this.tileData = {
            "tileMap": {
              "1": [
                [
                  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  0
                ],
                [
                  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  0
                ],
                [
                  0, 3, 1, 1, 1, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  0
                ],
                [
                  0, 4, 2, 2, 2, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
                  0
                ],
                [
                  0, 4, 2, 2, 2, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
                  0
                ],
                [
                  0, 4, 2, 2, 2, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
                  0
                ],
                [
                  0, 6, 5, 5, 5, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
                  0
                ],
                [
                  0, 0, 0, 0, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9, 0, 0, 0, 0, 0, 0, 3,
                  0
                ],
                [
                  0, 0, 0, 0, 0, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 8, 0, 0, 0, 0, 0, 0, 3,
                  0
                ],
                [
                  0, 0, 0, 0, 0, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 7, 2, 2, 2, 2, 2, 2, 2,
                  0
                ],
                [
                  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  0
                ],
                [
                  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  0
                ],
                [
                  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  0
                ],
                [
                  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  0
                ],
                [
                  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  0
                ],
                [
                  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  0
                ],
                [
                  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  0
                ],
                [
                  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  0
                ],
                [
                  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  0
                ],
                [
                  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  0
                ],
                [
                  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  0
                ],
                [
                  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  0
                ],
                [
                  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  0
                ],
                [
                  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  0
                ],
                [
                  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  0
                ]
              ]
            },
            "labels": {
              "1": { "x": 32, "y": 0 },
              "2": { "x": 64, "y": 96 },
              "3": { "x": 128, "y": 96 },
              "4": { "x": 0, "y": 32 },
              "5": { "x": 32, "y": 64 },
              "6": { "x": 0, "y": 64 },
              "7": { "x": 64, "y": 64 },
              "8": { "x": 64, "y": 32 },
              "9": { "x": 64, "y": 0 }
            }
          }
          
        this.loadTiles();
    }


    loadTiles(){
        let layer1 = this.tileData['tileMap'][1];
        for (let i = 0; i < layer1.length; i++){
            for (let j = 0; j < layer1[i].length; j++){
                let imgLabel = layer1[i][j]
                if (imgLabel != 0){
                    let coordinates = this.tileData['labels'][imgLabel]
                    let tile = new Tile(j * this.tileSize + this.x, i * this.tileSize + this.y, coordinates['x'], coordinates['y'], this.tileSize, "physical");
                    this.tiles.push(tile);
                }
            }
        }

        console.log("All Tiles: " + JSON.stringify(this.tiles));
    }

    render(ctx){
        for (let i = 0; i < this.tiles.length; i++){
            this.tiles[i].render(ctx, this.img);
        }
    }


}