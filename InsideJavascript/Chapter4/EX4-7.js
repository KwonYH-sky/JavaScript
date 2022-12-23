add(2, 3); // uncaught type error

var add = function (x, y) {
  console.log(x + y);
  return x + y;
};

add(3, 4); // 7
