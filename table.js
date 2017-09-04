let Itable = (function(){
    // 常量参数
    const PARAM = {
        wrapperClassName: 'i-table',
        rowClassName: 'i-table-row',
        cellClassName: 'i-table-row-cell'
    }


    /**
     * 
     * @param {*Object} opts {
     *          {DOM Element Object} ele,  表格需要挂载到的那个元素
     *          {Number} rows,  指定行数，默认为0
     *          {Number} columns, 指定列数，默认为0
     *          {String} wrapperClassName, 指定表格的类名，默认为'i-table'
     *          {String} rowClassName, 指定表格行的类名，默认为'i-table-row'
     *          {String} cellClassName 指定表格元素的类名， 默认为'i-table-cell'
     *      }
     *  
     */
    function Itable (opts) {
        this.ele = opts.ele || document.body
        this.rows = opts.rows || 0
        this.columns = opts.columns || 0
        // 设置css类名
        this.wrapperClassName = opts.wrapperClassName || PARAM.wrapperClassName
        this.rowClassName = opts.rowClassName || PARAM.rowClassName
        this.cellClassName = opts.cellClassName || PARAM.cellClassName
        
        this.wrapper = null
        this.rowEles = []
    }

    Itable.prototype = {
        init () {
            let row,
                cell
            this.wrapper = document.createElement('div')
            this._addClassName(this.wrapper, this.wrapperClassName)
            for (let i = 0; i < this.rows; i++) {
                row = document.createElement('div')
                /*-- 默认样式 */
                row.style.width = '100%'
                row.style.height = 100 / this.rows + '%'
                row.style.boxSizing = 'border-box'
                
                /* 默认样式 --*/
                this._addClassName(row, this.rowClassName)
                this.rowEles.push(row)
                this.wrapper.appendChild(row)
                for (let j = 0; j < this.columns; j++) {
                    cell = document.createElement('div')
                    /*-- 默认样式 */
                    cell.style.width = 100 / this.columns + '%'
                    cell.style.height = '100%'
                    cell.style.boxSizing = 'border-box'
                    cell.style.float = 'left'
                    
                    /* 默认样式 --*/
                    
                    this._addClassName(cell, this.cellClassName)
                    row.appendChild(cell)
                }
            }
        },
        done () {
            this._initCss()
            this.ele.appendChild(this.wrapper)
        },
        _addClassName (ele, className) {
            ele.className += (' ' + className)
            ele.className = ele.className.replace(/^\s*/, '')
        },
        _initCss () {
            
            let style = document.head.getElementsByTagName('style')[0] || document.createElement('style')
            
            if (this.wrapperClassName === PARAM.wrapperClassName) {
                style.innerText += `
                    .${this.wrapperClassName} {
                        width: 600px;
                        height: 600px;
                        background-color: gray;
                    }
                `
            }
            if (this.rowClassName === PARAM.rowClassName) {
                style.innerText += `
                    .${this.wrapperClassName} > .${this.rowClassName} {
                        background: red;
                        border: 1px solid transparent;
                        border-bottom:  none;
                    }
                    .${this.wrapperClassName} > .${this.rowClassName}:last-child {
                        border-bottom: 1px solid transparent;
                    }
                `
            }
            if (this.cellClassName === PARAM.cellClassName) {
                style.innerText += `
                    .${this.wrapperClassName} > .${this.rowClassName} > .${this.cellClassName} {
                        background: skyblue;
                        padding: 10px;
                        border: 1px solid #000;
                        border-right: none;
                    }
                    .${this.wrapperClassName} > .${this.rowClassName} > .${this.cellClassName}:last-child {
                        border-right: 1px solid #000;
                    }
                `
            }
            
            if (!document.head.getElementsByTagName('style')[0]) {
                document.head.appendChild(style)
            }
        }
        
    }

    return Itable
})()