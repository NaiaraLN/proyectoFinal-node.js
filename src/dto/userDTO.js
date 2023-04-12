export default class UserDTO{
    constructor(user){
        this.username = user.username;
        this.mail = user.mail;
        this.phone = user.photo;
        this.address = user.address;
        this.age = user.age;
        this.avatar = user.avatar.toStrinhg();
    }
}