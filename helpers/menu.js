const onelink = (perfil, nombres)=>{
    let menu;
    if ( perfil == 1 ){
        menu = [{
            welcome:'Bienvenida o bienvenido ',
            items: [
                { id: 1, nombre: 'Nueva sesión', icon: 'mdi-checkbox-marked-outline', link: '/sesiones'},
                { id: 2, nombre: 'Seguimiento a las Sesiones de los Consejos Distritales', icon: 'mdi-card-account-details-star', link:'/seguimiento'},
                { id: 3, nombre: 'Monitor', icon: 'mdi-chart-line', link: '/monitor'},
                { id: 5, nombre: 'Comisiones', icon: 'mdi-account-group', link: '/comisiones'},
                { id: 4, nombre: 'Reportes', icon: 'mdi-file-excel', link: '/reportes'}
            ]
        }];
    } else if( perfil == 2 ) {
        menu = [{
            welcome:'Bienvenida o bienvenido ' + nombres,
            items: [
                { id: 1, nombre: 'Seguimiento de la(s) Sesion(es) de los Consejos Distritales', icon: 'mdi-newspaper-variant-outline', link: '/seguimiento-representaciones'},
                { id: 98, nombre: 'Acreditación de las Representaciones de los Partidos Políticos y Candidaturas sin partido', icon: 'mdi-card-account-details-star', link:'',
                    submenu:[ 
                    { subId: 2, subnombre: 'Nuevo Registro', subLink: '/nuevo-acreditacion', icon: 'mdi-file-document-plus-outline'}, 
                    { subId: 3, subnombre: 'Seguimiento de acreditación', subLink: '/seguimiento-acreditacion', icon: 'mdi-map-search-outline'}]
                },
                { id: 99, nombre: 'Comisiones Distritales', icon: 'mdi-chart-line', link: '', 
                    submenu:[ 
                    { subId: 4, subnombre: 'Nuevo Registro', subLink: '/nuevo-comisiones', icon: 'mdi-file-document-plus-outline'}, 
                    { subId: 5, subnombre: 'Seguimiento de comisiones', subLink: '/seguimiento-comisiones', icon: 'mdi-map-search-outline'}]
                },
            ]
        }];
    } else if( perfil == 3 ){
        menu = [{
            welcome:'Bienvenida o bienvenido ',
            items: [
                { id: 2, nombre: 'Seguimiento a las Sesiones de los Consejos Distritales', icon: 'mdi-card-account-details-star', link:'/seguimientoConsulta'},
                { id: 3, nombre: 'Monitor', icon: 'mdi-chart-line', link: '/monitorConsulta'},
                { id: 5, nombre: 'Comisiones', icon: 'mdi-account-group', link: '/comisionesConsulta'},
                { id: 4, nombre: 'Reportes', icon: 'mdi-file-excel', link: '/reportesConsulta'}
            ]
        }];
    }
    return menu;
};

module.exports = {
    onelink
}