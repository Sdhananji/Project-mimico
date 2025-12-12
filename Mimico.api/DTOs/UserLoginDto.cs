using System.ComponentModel.DataAnnotations;


namespace Mimico.Api.DTOs
{
    

    public class UserLoginDto
    {
        [Required, EmailAddress]
        public String Email {get; set;} = null!;

        [Required]
        public String Password {get; set;} = null!;

        
    }
}