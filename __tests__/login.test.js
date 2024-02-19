import { loginController } from "../controllers/login";
import { signToken } from "../controllers/token/token";

const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
};

jest.mock("../controllers/database/database");

jest.mock("../controllers/token/token");

jest.mock("bcryptjs", () => {
    return {
        compare: jest.fn().mockImplementation((s, hash) => s == hash)
    };
});

it('should return login success', async () => {
    const req = {
        body: {
            emailoruser: "admin@admin",
            password: "admin_password"
        }
    };

    await loginController(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(signToken(1, "admin"));
});

it('should return login fail (no user)', async () => {
    const req = {
        body: {
            emailoruser: "user@email",
            password: "admin_password"
        }
    };

    await loginController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        error: true
    }));
});

it('should return login fail (wrong password)', async () => {
    const req = {
        body: {
            emailoruser: "admin@admin",
            password: "wrong"
        }
    };

    await loginController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        error: true
    }));
});