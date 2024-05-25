const servers = [
    // {
    //     name: "desarrollo",
    //     host: "145.0.40.76",
    //     port: 100, // Puerto para FTP o puerto para SFTP
    //     user: "developer",
    //     password: "d3wr3p01",
    //     secure: false, // Cambiar a true para usar SFTP
    //     route: "/prep2024/",
    //     develop: true
    // }
    // ,
    {
        name: "server_extractor",
        host: "145.0.179.22",
        port: 2010, // Puerto para FTP o puerto para SFTP
        user: "mysftpuser",
        password: "4cc3s0#13CM",
        secure: false, // Cambiar a true para usar SFTP
        route: "/",
        develelop: false
    }
];

module.exports = {
    servers
};