using System.ComponentModel.DataAnnotations;

namespace Mimico.Api.DTOs
{
    public class UserRegisterDto
    {
        [Required]
        public String FullName{get; set;} = null!;

        [Required, EmailAddress]
        public String Email {get; set;} =null!;

        [Required, MinLength(6)]
        public String Password {get; set;}= null!;

    }
}