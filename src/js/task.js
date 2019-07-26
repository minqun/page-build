class TableMove {
    constructor(el) {
        console.log(el)
        this.name = 'table move support';
        this.tableHeight = 0;
        this.tableWidth = 0;
        this.el = el;
        this.start = false;
        this.pageX = 0;
        this.pageY = 0;
        this.targetY = 0;
        this.targetX = 0;
        this.width = 0;
        this.height = 0;
        this.dom = null;
        this.topLock = false;
        this.domStyle = 'position:absolute; width: 2px; background:red;z-index: 2;cursor:e-resize;'

    }
    getTable(event) {
        let target = event.target;
        while (target.nodeName != 'TABLE') {
            target = target.parentNode
        }
        this.tableHeight = target.clientHeight
        this.tableWidth = target.clientWidth

    }
    init() {
        for (let i in this.el) {
            if (typeof this.el[i] == 'object') {
                this.addNode(this.el[i])
                    // this.listen(this.el[i])
            }

        }
    }
    nowClick(event) {
        this.start = true;
        this.width = event.target.offsetWidth;
        this.height = event.target.offsetHeight;
        this.getLocal(event);
        this.getTable(event)
        this.topLock = true;
        console.log('w:', this.width, 'h:', this.height)
        console.log('px:', this.pageX, 'py:', this.pageY)
        console.log('tx:', this.targetX, 'ty:', this.targetY)
        this.addNode(event)
    }
    getLocal(event) {
        this.pageX = event.pageX;
        this.pageY = event.pageY;
        this.targetX = event.offsetX;
        this.targetY = event.offsetY;
        this.eventX = event.pageX - event.offsetX;
        if (!this.topLock) {
            this.eventY = event.pageY - event.offsetY;
        }
    }
    addNode(event) {
        console.log(event)
        let dom = document.createElement('div');
        dom.className = "dom-th"
        dom.style = `${this.domStyle}height:100%;top:${0}px;right:${0}px;`
        event.appendChild(dom)
        this.dom = document.querySelectorAll('.dom-th')

    }
    move(event) {
        if (this.start) {
            this.getLocal(event);
            // console.log('w:',this.width, 'h:', this.height)
            // console.log('px:',this.pageX, 'py:', this.pageY)
            // console.log('tx:',this.targetX, 'ty:', this.targetY)
            this.dom.style = `${this.domStyle}height:${this.tableHeight}px;top:${this.eventY}px;left:${this.pageX}px;`
        }
    }

    up() {
        if (this.start) {
            this.start = false;
            console.log('leave', event);
            if (this.dom == null) return
            let target = event.target;
            while (target.nodeName != 'TH') {
                target = target.parentNode
            }
            console.log(target, 'target')
            target.removeChild(this.dom);
            this.dom = null

        }

    }
    listen(el) {
        el.addEventListener('mousedown', (event) => {
            this.nowClick(event);
        }, false);
        el.addEventListener('mousemove', (event) => {
            this.move(event);
        }, false);
        el.addEventListener('mouseup', (event) => {
            this.up();
        }, false);
        el.addEventListener('mouseleave', (event) => {
            this.up();
        }, false);
    }
}
let tables = new TableMove(document.querySelectorAll('th'))
tables.init()
