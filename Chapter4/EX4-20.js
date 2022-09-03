function func1(arg1, arg2) {
  console.log(arg1, arg2);
}

func1(); // undefined undefined
func1(1); // 1 undefined
func1(1, 2); // 1 2
func1(1, 2, 3); // 1 2