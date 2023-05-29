window.onload = function () {

  var gameBoard = [
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [2, 0, 2, 0, 2, 0, 2, 0],
    [0, 2, 0, 2, 0, 2, 0, 2],
    [2, 0, 2, 0, 2, 0, 2, 0]
  ];

  var pieces = [];//масив з шашками
  var tiles = []; //масив з плитками


  function dist(x1, y1, x2, y2){
    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
  }



  function Piece(element, position) {//конструктор для шашки

    this.allowedtomove = true;//дозвіл на рух

    this.element = element;//звертється до dom елемента

    this.position = position;//позиція шашки

    this.player = '';//який гравець

    if (this.element.attr("id") < 12)//визначаємо гравця по індексу
      this.player = 1;
    else
      this.player = 2;

    this.king = false;//король чи ні

    this.makeKing = function () {//робить королем
      this.element.css("backgroundImage", "url('img/king" + this.player + ".png')");
      this.king = true;
    }

    this.move = function (tile) {//переміщення шашки по дошці tile - плитка на яку переміщаємо
      this.element.removeClass('selected');//видаляє селектед з елемента
      if (!Board.isValidPlacetoMove(tile.position[0], tile.position[1]))//перевіряє чи є на цій позиції якась шашка якщо не є то фолс
        return false;

      if (this.player == 1 && this.king == false) {
        if (tile.position[0] < this.position[0]) return false;
      }
      else if (this.player == 2 && this.king == false) {
        if (tile.position[0] > this.position[0]) return false;
      }
      //видаляє позначку з дошки і кладе її на інше місце
      Board.board[this.position[0]][this.position[1]] = 0; //0 встановлюється для початкової позиції
      Board.board[tile.position[0]][tile.position[1]] = this.player;
      this.position = [tile.position[0], tile.position[1]];

      this.element.css('top', Board.dictionary[this.position[0]]); //ці рядки оновлюють графічну позицію шашок задаючи значення CSS top і left за допомоги Board.dictionary
      this.element.css('left', Board.dictionary[this.position[1]]);

      if (!this.king && (this.position[0] == 0 || this.position[0] == 7))//Ця умова перевіряє, чи фігура є королем (this.king) і перевіряє, чи досягнута кінцева лінія дошки (0 або 7). Якщо це так, викликається метод makeKing, який робить фігуру королем.
        this.makeKing();//якщо шашка вона на 0 рядку або 7 то стає королем
      return true;
    };

    this.canJumpAny = function () {//ця функція перевіряє чи може перепригнути врага true or false

      return (this.canOpponentJump([this.position[0] + 2, this.position[1] + 2]) || //передаємо массив з можливими позиціями а вертає нам чи можна туда походити чи нет
        this.canOpponentJump([this.position[0] + 2, this.position[1] - 2]) ||
        this.canOpponentJump([this.position[0] - 2, this.position[1] + 2]) ||
        this.canOpponentJump([this.position[0] - 2, this.position[1] - 2]))
    };


    this.canOpponentJump = function (newPosition) {// Перевіряє чи можна перепригнути якусь шашку

      var dx = newPosition[1] - this.position[1]; //відстані від нової позиції до старої
      var dy = newPosition[0] - this.position[0];

      if (this.player == 1 && this.king == false) {//якщо плейер 1 ходить назад то false
        if (newPosition[0] < this.position[0]) return false;
      } else if (this.player == 2 && this.king == false) {
        if (newPosition[0] > this.position[0]) return false;//якщо 2 плейер ходить назад то false
      }

      if (newPosition[0] > 7 || newPosition[1] > 7 || newPosition[0] < 0 || newPosition[1] < 0) return false;//відлік рядків починається з нуля якщо нова позиція за межами доски то фолс

      var tileToCheckx = this.position[1] + dx / 2;//позиція ворога стовбичик
      var tileToChecky = this.position[0] + dy / 2;//рядок

      if (tileToCheckx > 7 || tileToChecky > 7 || tileToCheckx < 0 || tileToChecky < 0) return false; //провірка чи враг буде за межами доски, якщо да то вертає фолс
          //чи є враг якого можна вбити                            //і чи є враг на новій позиції, якщо нема то супер
      if (!Board.isValidPlacetoMove(tileToChecky, tileToCheckx) && Board.isValidPlacetoMove(newPosition[0], newPosition[1])) {//якщо Board.isValidPlacetoMove вертає фолс тобто позиція занята, то значеня стає тру
        //шукаємо яка саме шашка там находиться
        for (let pieceIndex in pieces) {//в масиві pieces хранимо шашки
          if (pieces[pieceIndex].position[0] == tileToChecky && pieces[pieceIndex].position[1] == tileToCheckx) {
            if (this.player != pieces[pieceIndex].player) {
              return pieces[pieceIndex];//вертає шашку яку ми вбиваємо
            }
          }
        }
      }
      return false;
    };

    this.opponentJump = function (tile) {//виконує функцію стрибка на плитку

      var pieceToRemove = this.canOpponentJump(tile.position);//може прийняти обєкт шашки яку ми вбиваємо або null

      if (pieceToRemove) {//перевіряє чи існує чи не існує. Якщо null(неіснує) то умова не виконується.
        pieceToRemove.remove();
        return true;
      }
      return false;
    };

    this.remove = function () {
      this.element.css("display", "none");//зникає картинка шашки з яков ми працюємо
      if (this.player == 1) {
        $('#player2').append("<div class='capturedPiece'></div>");//додається картинка очка з шашкою до плейера 2
        Board.score.player2 += 1;
      }
      if (this.player == 2) {
        $('#player1').append("<div class='capturedPiece'></div>");//додається картинка з шашкою до плейера 1
        Board.score.player1 += 1;
      }
      Board.board[this.position[0]][this.position[1]] = 0;//на дошці де ми вбили фігуру кладемо 0

      this.position = [];//масив з позиціями стає пустим після вбистви шашки
      var playerWon = Board.checkifAnybodyWon();//первіряємо чи виграв якийсь ігрок
      if (playerWon) {
        $('#winner').html("Player " + playerWon + " has won!");//виводить хто виграв
      }
    }
  }

  function Tile(element, position) {//передаємо плитку

    this.element = element;
    this.position = position;
    this.inRange = function (piece) {//метод який перевіряє чи може шашка сходити на дану плитку
      for (let k of pieces)//цикл перебирає всі фігури на дошці чи не занята плитка іншою фігурою
        if (k.position[0] == this.position[0] && k.position[1] == this.position[1]) return 'wrong';//позиція шашки і клітки сходиться
      if (!piece.king && piece.player == 1 && this.position[0] < piece.position[0]) return 'wrong';//якщо плитка находиться заді відносно шашки плейера 1
      if (!piece.king && piece.player == 2 && this.position[0] > piece.position[0]) return 'wrong';//якщо плитка відноситься заді відносно шашки плейера 2

      if (dist(this.position[0], this.position[1], piece.position[0], piece.position[1]) == Math.sqrt(2)) {

        return 'regular';//звичайний хід
      } else if (dist(this.position[0], this.position[1], piece.position[0], piece.position[1]) == 2 * Math.sqrt(2)) {

        return 'jump';//хід вбиство фігури
      }
    };
  }

  var Board = {
    board: gameBoard,//властивість обєкта боард, містить в собі стан дошки початковий
    score: {//містить кількість очок кожного гравця
      player1: 0,
      player2: 0
    },
    playerTurn: 1, //зберігає чия черга ходити. наразі 1 плейера
    jumpexist: false, //Зберігає логічне значення, яке показує, чи існує можливість зробити стрибок (захоплення фігури супротивника).
    continuousjump: false, // Зберігає логічне значення, яке показує, чи триває послідовне захоплення шашок
    tilesElement: $('div.tiles'),//представляє посилання на DOM-елемент <div> з класом "tiles". в httml
//Масив, що містить рядки, що використовуються для встановлення розташування плиток та фігур на дошці.
    dictionary: ["0vmin", "10vmin", "20vmin", "30vmin", "40vmin", "50vmin", "60vmin", "70vmin"],

    initalize: function () {//Метод, що ініціалізує дошку гри, розміщує плитки та фігури на відповідних позиціях.
      var countPieces = 0;//лічильник фігур
      var countTiles = 0;//лічильник плиток
      for (let row in this.board) { //проходимось по рядкам і стовпчиках дошки board
        for (let column in this.board[row]) {         //row - рядок   Column - стовпчик
          if (row % 2 == 1) {
            if (column % 2 == 0) {
              countTiles = this.tileRender(row, column, countTiles)//рядки і стовпчики на яких розташовуються шашки
            }
          } else {
            if (column % 2 == 1) {
              countTiles = this.tileRender(row, column, countTiles)
            }
          }
          if (this.board[row][column] == 1) {//встановленя шашок на дошку якщо один та це шашка плейера 1
            countPieces = this.playerPiecesRender(1, row, column, countPieces)
          } else if (this.board[row][column] == 2) {//якщо 2 то шашка плеєра 2
            countPieces = this.playerPiecesRender(2, row, column, countPieces)
          }
        }
      }
    },
    tileRender: function (row, column, countTiles) {
      //створємо плитку з айді в зависимості від countTiles
      this.tilesElement.append("<div class='tile' id='tile" + countTiles + "' style='top:" + this.dictionary[row] + ";left:" + this.dictionary[column] + ";'></div>");//сторили обєкт плитки на дошку
      tiles[countTiles] = new Tile($("#tile" + countTiles), [parseInt(row), parseInt(column)]); //використовується # для вибору елемента з id "tile" + countTiles.
      return countTiles + 1;
    },

    playerPiecesRender: function (playerNumber, row, column, countPieces) {
      $(`.player${playerNumber}pieces`).append("<div class='piece' id='" + countPieces + "' style='top:" + this.dictionary[row] + ";left:" + this.dictionary[column] + ";'></div>");//створили кожний обєкт шашки на дошку для плейера 1 або 2, зависить від player number
      //кожний елемент массива pieces є обєктом конструктора Piece
      pieces[countPieces] = new Piece($("#" + countPieces), [parseInt(row), parseInt(column)]);//переведимо рядок row в інт і так же з стовпчиком в pieces хранимо наші шашки з кожним особливим айді.
      return countPieces + 1;
    },

    isValidPlacetoMove: function (row, column) {//перевіряє чи можна походити сюда

      if (row < 0 || row > 7 || column < 0 || column > 7) return false;
      if (this.board[row][column] == 0) {//якщо позиція не занята то вертає тру
        return true;
      }
      return false;//якщо занята то фолс
    },

    changePlayerTurn: function () {//полоска під плейером який ходить
      if (this.playerTurn == 1) {
        this.playerTurn = 2;
        $('.turn').css("background", "linear-gradient(to right, transparent 50%, #E08CFF 50%)");//to right означає що змінюється зліва направо
      } else {
        this.playerTurn = 1;
        $('.turn').css("background", "linear-gradient(to right, #E08CFF 50%, transparent 50%)");//тут міняється положення де буде полоска
      }
      this.check_if_jump_exist()
      return;
    },
    checkifAnybodyWon: function () {//перевірка чи хтось виграв
      if (this.score.player1 == 12) {
        return 1;
      } else if (this.score.player2 == 12) {
        return 2;
      }
      return false;
    },

    clear: function () {//перезавантажує сторінку і ігра начинається заново
      location.reload();
    },
    check_if_jump_exist: function () {//перевірка чи можна пригнути для активного гравця
      this.jumpexist = false
      this.continuousjump = false;

      for (let k of pieces) {//проходимось по кожному обєкту в циклі pieces в ньому їх 23.
          k.allowedtomove = false;
        //якщо шашка не пуста і якщо ця шашка ігрока того що ходить і може зробити прижок то  this.jumpexist = true k.allowedtomove = true;
        if (k.position.length != 0 && k.player == this.playerTurn && k.canJumpAny()) {//k.position.length != 0 означає що наш обєкт шашки має бути інціалізований
          this.jumpexist = true //може перепригути
          k.allowedtomove = true;//може походити
        }
      }

      if (!this.jumpexist) {
        for (let k of pieces) k.allowedtomove = true;//якщо перепригути не може просто шукає які шашки можуть походити
      }
    },

  Board.initalize();
  //ми клікаємо на елемент з класом .piece
  $('.piece').on("click", function () {//$(селектор).on(подія, функція обробки);
    var selected;//bool чи вибрана фігура чи ні
    var isPlayersTurn = ($(this).parent().attr("class").split(' ')[0] == "player" + Board.playerTurn + "pieces");//перевірка чи вибрана фігура належить фігурі яка ходить
    if (isPlayersTurn) {
      if (!Board.continuousjump && pieces[$(this).attr("id")].allowedtomove) {
        if ($(this).hasClass('selected')) selected = true;

        $('.piece').each(function (index) {
          $('.piece').eq(index).removeClass('selected')
        });
        if (!selected) {
          $(this).addClass('selected');
        }
      }
    }
  });

  $('#cleargame').on("click", function () {//якщо нажимаємо на кліар гейм включається метод кліар
    Board.clear();
  });

  $('.tile').on("click", function () {

    if ($('.selected').length != 0) {//перевіряє чи існує елемент з класом селектед

      var tileID = $(this).attr("id").replace(/tile/, '');//читає айді плитки на яку ми нажали
      var tile = tiles[tileID];//отримує обєкт плитки з масиву tiles

      var piece = pieces[$('.selected').attr("id")];//шашка яку ми вибрали
      //щащка яку ми вибрали це обєкт, а властивість position це массив з двох значень в 0 якого має рядок а в 1 стовпчик

      var inRange = tile.inRange(piece);//перевіряє чи вибрана плитка находиться в межі шашки

      if (inRange != 'wrong') {//якщо знаходиться в межах то виконуємо умову

        if (inRange == 'jump') {//якщо можна зробити прижок
          if (piece.opponentJump(tile)) { //В tile.position храниться в [0] рядок в [1] стовпичк. Якщо шашка існує яку вбиваємо то умова виконується.
            piece.move(tile);//передвигаємо шашку на позицію
            if (piece.canJumpAny()) {

              piece.element.addClass('selected');

              Board.continuousjump = true;
            } else {
              Board.changePlayerTurn()
            }
          }

        } else if (inRange == 'regular' && !Board.jumpexist) {//обичний хід
          if (!piece.canJumpAny()) {
            piece.move(tile);
            Board.changePlayerTurn()
          } else {
            alert("Ошибка в ході");
          }
        }
      }
    }
  });
}
