export default function (...args){
    // Просто генератой id города по двум координатам. Координаты обрезаются не огругляясь и конкатинируются в строку через /
    // Имитация уникального id , что бы отличать хоть как-то города, а то от разных api разные ответы.
    let id = args.reduce((acc,num)=>{
        num = num.toString()
        num = num.slice(0, (num.indexOf("."))+2);
        return acc? acc +'/'+ num :  acc + num
    },'')

    return id


}
