/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-07 16:31:15
 * @LastEditTime: 2019-10-16 19:23:19
 * @LastEditors: Please set LastEditors
 */



function dataURLtoFile(dataurl, filename) {
    //将base64转换为文件
    let arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}

function setImage(callback) {

    document.querySelector(".bg").setAttribute("crossOrigin", "anonymous");
    html2canvas(document.querySelector(".bg"), { useCORS: true }).then((canvas) => {
        let url = canvas.toDataURL("image/png");
        let time = new Date()
        console.log({ dataURI: url, file: dataURLtoFile(url, time.getTime()) })
        document.getElementById("bg").src = url;
        return { dataURI: url, file: dataURLtoFile(url, time.getTime()) };
    });
};

function addName() {
    document.querySelector(".cell-input").className = "cell-input auname"
}
