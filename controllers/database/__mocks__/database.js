const supabase = {
    schema: jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
            select: jest.fn().mockReturnValue({
                or: jest.fn().mockResolvedValue({
                    data: [{
                        id: 1,
                        email: "admin@admin",
                        username: "admin_user",
                        password: "admin_password",
                        role: "admin"
                    }]
                })
            })
        })
    })
}

export default supabase;