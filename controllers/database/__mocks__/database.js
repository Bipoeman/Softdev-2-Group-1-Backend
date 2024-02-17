const mockUserData = [{
    id: 1,
    email: "admin@admin",
    username: "admin_user",
    password: "admin_password",
    role: "admin"
}];

const evalExpression = (op, data1, data2) => {
    switch (op) {
        case 'eq':
            return data1 === data2
        default:
            throw new Error('Unimplemented operation');
    }
};

const from = jest.fn().mockImplementation((relation) => {
    switch (relation) {
        case "user_info":
            return {
                select: jest.fn().mockReturnValue({
                    or: jest.fn().mockImplementation((query) => {
                        const expressions = query.split(',');
                        const expression1 = expressions[0].split('.');
                        const expression2 = expressions[1].split('.');
                        return {
                            data: mockUserData.filter((data) => {
                                return evalExpression(expression1[1], data[expression1[0]], expression1[2]) ||
                                    evalExpression(expression2[1], data[expression2[0]], expression2[2]);
                            }),
                            error: null
                        }
                    }),
                    data: mockUserData
                }),
                insert: jest.fn().mockImplementation((newData) => ({
                    data: [
                        ...mockUserData,
                        ...newData
                    ],
                    error: null
                }))
            };
        default:
            // throw new Error(`Unimplemented mock relation: ${relation}`);
            return {
                select: jest.fn().mockReturnValue({
                    data: null,
                    error: null
                }),
                insert: jest.fn().mockReturnValue({
                    data: null,
                    error: null
                }),
            };
    }
})

const supabase = {
    schema: jest.fn().mockReturnValue({
        from: from
    }),
    from: from
};

export default supabase;