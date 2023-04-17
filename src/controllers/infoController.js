import { mode, port ,ADMIN_MAIL, SESSION,MONGO_URI} from "../config.js";
import UserDTO from "../dto/userDTO.js";

class InfoController{
    getInfo(req, res){
        let admin = req.user?.username === 'admin';
        let user = req.user? new UserDTO(req.user,admin) : null;
        const args = [];
        for (let i = 2; i < process.argv.length; i++) {
            const el = process.argv[i];
            args.push(el)
        }
        let serverMode;
        let script;
        mode === 'CLUSTER' ? serverMode='Production' : serverMode='Development';
        serverMode === 'Production' ? script='node src/server.js -m CLUSTER' : script='nodemon src/server.js'
        const info = {
            mode:mode,
            serverMode: serverMode,
            script: script,
            port: port,
            platform: process.platform,
            version: process.version,
            memory: process.memoryUsage.rss(),
            path: process.execPath,
            id: process.pid,
            dirname: process.cwd(),
            adminMail: ADMIN_MAIL,
            session:SESSION,
            mongoUrl:MONGO_URI
        }
        res.render('info', {
            args,
            info,
            user
        })
    }
}
export default new InfoController()