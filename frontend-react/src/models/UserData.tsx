interface UserData {
    name: string;
    password: string;
    password2?: string;
}

export let NewLoginUserData: UserData = {
    name: "",
    password: ""
};

export let NewRegisterUserData: UserData = {
    name: "",
    password: "",
    password2: ""
};

export default UserData;
