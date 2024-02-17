//import { registerController } from "../controllers/register";

const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
};

it.skip('should return register success', () => {
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

it.skip('should return register fail', () => {
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