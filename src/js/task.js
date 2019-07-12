class Names {
    constructor(param) {
        this.age = 24;
        this.name = "mq"
    }
    static hello(e) {
        return `hello world ${e}`
    }
    func() {
        return '敲键盘'
    }


}
class Sesion extends Names {
    constructor(strong, age) {
        super()
        this.body = strong;
        this.age = age;
    }
    func() {
        return '运动';
    }
}
console.log(Names.hello('裙裙'))
let man = new Sesion(180, 26);
console.log(man)
