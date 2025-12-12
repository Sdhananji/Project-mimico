using System.ComponentModel.DataAnnotations;

namespace Mimico.Api.Models
{
    public class User
    {
        [Key]
        public int Id {get; set;}

        [Required, MaxLength(100)]
        public String FullName {get; set;}

        [Required, MaxLength(100)]
        public String Email{ get; set;}

        [Required]
        public byte[] PasswordHash {get; set;} = null!;

        [Required]
        public byte[] PasswordSalt {get; set;} = null!;

        [Required]
        public String Role {get; set;} = "Customer";   //Default role is customer

    }
}