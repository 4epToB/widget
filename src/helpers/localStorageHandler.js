export function addConfigToLS(cities){
    localStorage.setItem('weatherConfig',JSON.stringify(cities))
}
export function config(){
    let config = JSON.parse(localStorage.getItem('weatherConfig'))
    return config || null
}
