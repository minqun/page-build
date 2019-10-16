class TableMove {
    constructor(el, table, option = {}) {
        this.name = 'table move support';
        this.tableHeight = table.clientHeight;
        this.tableWidth = table.clientWidth;
        this.table = table;
        this.targetIndex = 0;
        this.borderColor = option.borderColor || '#f2f2f2';
        this.minWidth = option.minWidth || 50;
        this.el = el;
        this.start = false;
        this.pageX = 0;
        this.pageY = 0;
        this.targetY = 0;
        this.targetX = 0;
        this.width = 0;
        this.height = 0;
        this.thDom = el
        this.domLine = null;
        this.dom = null;
        this.topLock = false;
        this.targetTh = null;
        this.domStyle = 'position:absolute; width: 2px; background:transparent;z-index: 2;cursor:e-resize;height:100%;top:0px;right:-1px;'

    }
    init() {
        for (let i in this.el) {
            if (typeof this.el[i] == 'object') {
                this.el[i].setAttribute('index', i)
                this.el[i].style.position = "relative";
                this.addNode(this.el[i], i)
                this.listen(this.dom[i])
            }
        }
        let arr = new Set(this.el);
        console.log(Array.from(arr).reduce((a, b) => { console.log(a, b); if (a && b) return a.clientWidth + b.clientWidth }, 0))
    }
    nowClick(e) {
        this.tableHeight = this.table.clientHeight;
        this.tableWidth = this.table.clientWidth;
        e.stopPropagation();
        e.preventDefault();
        this.targetIndex = e.target.tIndex;
        this.targetTh = this.thDom[this.targetIndex];
        let event = this.targetTh;
        this.start = true;
        this.width = event.offsetWidth;
        this.height = event.offsetHeight;
        this.topLock = true;
        this.addLine()
    }
    getTHlength(el) {
        return this.pageX - el.getBoundingClientRect().x > this.minWidth ? this.pageX - el.getBoundingClientRect().x : this.minWidth;
    }
    getLocal(event) {
        this.pageX = event.pageX;
        this.pageY = event.pageY;
        this.targetX = this.table.getBoundingClientRect().x;
        this.targetY = this.table.getBoundingClientRect().y;
        this.eventX = event.pageX - this.targetX;
        if (!this.topLock) {
            this.eventY = event.pageY - event.offsetY;
        }
    }
    addLine() {
        let dom = document.createElement('div');
        dom.className = "dom-th-line"
        dom.style = `${this.domStyle}height:100%;top:${0}px;left:${0}px;width: 0px;`
        this.table.parentNode.insertBefore(dom, this.table)
        this.table.parentNode.style.position = "relative";
        this.domLine = document.querySelector('.dom-th-line')
    }
    addNode(event, i) {
        console.log(event)
        let dom = document.createElement('div');
        dom.className = "dom-th"
        dom.tIndex = i;
        dom.style = `${this.domStyle}height:100%;top:${0}px;right:${0}px;`
        event.appendChild(dom)
        this.dom = document.querySelectorAll('.dom-th')
    }
    move(event) {
        if (this.start && event) {
            this.getLocal(event);
            if (this.domLine) {
                this.domLine.style = `${this.domStyle}height:${this.tableHeight}px;top:${0}px;left:${this.eventX > this.minWidth ? this.eventX : this.minWidth}px;width: 1xp;background:${this.borderColor};`

            }
        }
    }
    leave() {
        if (this.start) {
            this.start = false;
            if (this.domLine) {
                this.table.parentNode.removeChild(this.domLine);
                this.domLine = null;
            }
        }
    }
    up(event) {
        if (this.start) {
            this.start = false;
            this.thDom[this.targetIndex].style = `width:${this.getTHlength(this.thDom[this.targetIndex])}px`;
            if (this.domLine) {
                this.table.parentNode.removeChild(this.domLine);
                this.domLine = null;
            }

        }

    }
    listen(el) {
        el.addEventListener('mousedown', (event) => {
            this.nowClick(event);
        }, false);

        el.addEventListener('mouseup', (event) => {
            this.up();
        }, false);
        this.table.parentNode.addEventListener('mousemove', (event) => {
            this.move(event);
        }, false);
        this.table.parentNode.addEventListener('mouseleave', (event) => {
            this.leave();
        }, false);

        this.table.parentNode.addEventListener('mouseup', (event) => {
            this.up();
        }, false);
    }
}
let tables = new TableMove(document.querySelectorAll('th'), document.querySelector('.table'), {
    borderColor: "green",
    minWidth: 60
})
tables.init()
