import { registerController } from "../controllers/user/register.js";

const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
};

it('should return register success', () => {
    const req = {
        body: {
            username: "admin",
            password: "admin",
            passwordagain: "admin"
        }
    };

    registerController(req, res);

    expect(res.send).toHaveBeenCalledWith('register success');
});

it('should return register fail', () => {
    const req = {
        body: {
            username: "admin",
            password: "admin1",
            passwordagain: "admin"
        }
    };

    registerController(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith('register fail');
});