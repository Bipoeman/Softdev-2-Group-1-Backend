import bcrypt from "bcryptjs";
import { registerController } from "../controllers/register";

const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
};

jest.mock("../controllers/database/database");

jest.mock("bcryptjs", () => {
    return {
        hashSync: jest.fn().mockImplementation((s, salt) => "hashedPassword")
    };
});

it('should return register success', async () => {
    const req = {
        body: {
            email: "newuser@email",
            fullname: "John Doe",
            username: "john123",
            password: "securepassword"
        }
    };

    await registerController(req, res);

    expect(bcrypt.hashSync).toHaveBeenCalledWith(req.body.password, 10);
    expect(res.send).toHaveBeenCalled();
});

it('should return register fail (email)', async () => {
    const req = {
        body: {
            email: "admin@admin",
            fullname: "John Doe",
            username: "john123",
            password: "securepassword"
        }
    };

    await registerController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        error: true
    }));
});

it('should return register fail (username)', async () => {
    const req = {
        body: {
            email: "admin@admin",
            fullname: "John Doe",
            username: "john123",
            password: "securepassword"
        }
    };

    await registerController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        error: true
    }));
});