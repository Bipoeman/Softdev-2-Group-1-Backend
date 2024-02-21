import { loginController } from "../controllers/user/login.js";
import { signToken } from "../controllers/token/token";

const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
};

jest.mock("../controllers/token/token", () => {
    const originalModule = jest.requireActual("../controllers/token/token");

    return {
        ...originalModule,
        signToken: (id, name) => "signedToken"
    };
});

it('should return login success', () => {
    const req = {
        body: {
            username: "admin",
            password: "admin"
        }
    };

    loginController(req, res);

    expect(res.send).toHaveBeenCalledWith(signToken(2, "admin"));
});

it('should return login fail', () => {
    const req = {
        body: {
            username: "admin",
            password: "admin1"
        }
    };

    loginController(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith('login fail');
});