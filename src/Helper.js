const valorPlataforma = 1050
const iva = 0.19

export function cobroPlataforma (dias){
    return dias * valorPlataforma
}

export function cobroAdministracion(prestamo){
    let cobro;
    if(prestamo >= 120000 && prestamo <= 200000){
        cobro = 15000
    }else if(prestamo >= 201000 && prestamo <= 300000){
        cobro = 20000
    }else if(prestamo >= 301000 && prestamo <= 400000){
        cobro = 25000
    }else if(prestamo >= 401000 && prestamo <= 500000){
        cobro = 29000
    }else if(prestamo >= 501000 && prestamo <= 750000){
        cobro = 34000
    }
    return cobro    
}

export function intereses(dias, valor){
    const interes = {
        dia1:   0.000620035,
        dia2:   0.000620228,
        dia3:   0.00062042,
        dia4:   0.000620612,
        dia5:   0.000620805,
        dia6:   0.000620997,
        dia7:   0.000621201,
        dia8:   0.000621383,
        dia9:   0.000621575,
        dia10:  0.000621768,
        dia11:	0.000622009,
        dia12:  0.000622154,
        dia13:	0.000622412,
        dia14:	0.000622618,
        dia15:	0.000622734,
        dia16:	0.000622997,
        dia17:	0.000623148,
        dia18:	0.000623314,
        dia19:	0.000623701,
        dia20:	0.000623701,
        dia21:	0.000623929,
        dia22:	0.000624186,
        dia23:	0.000624477,
        dia24:	0.000624477,
        dia25:	0.000624809,
        dia26:	0.000625194,
        dia27:	0.000625194,
        dia28:	0.0006256421707169,
        dia29:	0.0006256421707169,
        dia30:	0.000625642
    }
           
    return  (valor * interes['dia'+dias]) * dias
    
}

export function cobroIva(administracion, plataformaWeb){
    return (administracion + plataformaWeb) * iva
}







export function formateador (newValue){
    let cadena = ""; 
    let aux;
    let cont = 1,m,k;
    if(newValue<0) aux=1; else aux=0;
    newValue=newValue.toString();
    for(m=newValue.length-1; m>=0; m--){
        cadena = newValue.charAt(m) + cadena;
        if(cont%3 == 0 && m >aux)  cadena = "." + cadena; else cadena = cadena;
        if(cont== 3) cont = 1; else cont++;
      }
    cadena = cadena.replace(/.,/,",");
    return cadena
}