
function validateCpf(cpf){
    cpf = cpf.replace(/\D/g, '');
    if(cpf.toString().length != 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    var result = true;
    [9,10].forEach(function(j){
        let amount = 0, rest;
        cpf.split(/(?=)/).splice(0,j).forEach(function(e, i){
            amount += parseInt(e) * ((j+2)-(i+1));
        });
        rest = amount % 11;
        rest = (rest <2)?0:11-rest;
        if(rest != cpf.substring(j, j+1)) result = false;
    });
    return result;
}

