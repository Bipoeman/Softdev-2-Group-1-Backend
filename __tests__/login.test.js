import { loginController } from "../controllers/login";
import { signToken } from "../controllers/token/token";

const res = {
    status: jest.fn().mockImplementation((statusCode) => {
        console.log(statusCode);
        return res;
    }),
    send: jest.fn().mockImplementation((data) => {
        console.log(data);
        return res;
    }),
};

jest.mock('../controllers/database/database')

jest.mock("../controllers/token/token");

jest.mock("bcryptjs", () => {
    return {
        compare: jest.fn().mockImplementation((s, hash) => s == hash)
    };
});

it('should return login success', () => {
    const req = {
        body: {
            emailoruser: "admin@admin",
            password: "admin_password"
        }
    };

    loginController(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(signToken(1, "admin"));
});

it.skip('should return login fail', () => {
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