using System.Security.Cryptography;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Mimico.Api.DTOs;
using Mimico.Api.Models;
using Mimico.Api.Repositories;
using Microsoft.AspNetCore.Identity;

namespace Mimico.Api.Services
{
    public class AuthService : IAuthService
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;

        public AuthService (IAuthRepository repo, IConfiguration config)
        {
            _repo= repo;
            _config= config;

        }

        public async Task<string?> RegisterAsync(UserRegisterDto dto)
        {
           if(await _repo.GetUserByEmailAsync(dto.Email)!=null)
              {
                return null; // User already exists
              }
            CreatePasswordHash(dto.Password, out byte[] hash, out byte[] salt);

            var user = new User
            {
                FullName = dto.FullName,
                Email=dto.Email,
                PasswordHash = hash,
                PasswordSalt= salt,
                Role="Customer"
            };

            await _repo.AddUserAsync(user);
            await _repo.SaveChangesAsync();

            return GenerateJwtToken(user);
        }

        public async Task<string?> LoginAsync(UserLoginDto dto)
        {
            var user = await _repo.GetUserByEmailAsync(dto.Email);
            if(user==null) return null;

            if(!VerifyPassword(dto.Password, user.PasswordHash, user.PasswordSalt))
            {
                return null; // Invalid password
            }

            return GenerateJwtToken(user);
        }

        //Password hashing Methods

        private void CreatePasswordHash(string password, out byte[] hash, out byte[] salt)
        {
            using var hmac= new HMACSHA512();
            salt=hmac.Key;
            hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
        }

        private bool VerifyPassword(string password, byte[] hash, byte[] salt)
        {
            using var hmac=new HMACSHA512(salt);
            var computeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            return computeHash.SequenceEqual(hash);
        }



    //JWT Generation





        private string GenerateJwtToken(User user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.FullName),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role),
                new Claim("UserId", user.Id.ToString())
            }; 

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_config["Jwt:Key"]));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

            var token = new JwtSecurityToken(
                issuer:_config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddDays(7),
                signingCredentials:creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<UserProfileDto?> GetCurrentUserAsync(int userId)
        {
            var user = await _repo.GetUserByIdAsync(userId);
            if(user==null) return null;

            return new UserProfileDto
            {
                Id = user.Id,
                FullName= user.FullName,
                Email=user.Email,
                Role=user.Role
            };

        }

    }
}

