from django.db import models
from django.template.defaultfilters import slugify
from datetime import datetime
# Create your models here.

class Categories(models.TextChoices):
    WORLD = 'world'
    ENVIRONMENT = 'environment'
    TECHNOLOGY = 'technology'
    DESIGN = 'design'
    CULTURE = 'culture'
    BUSINESS = 'business'
    POLITICS = 'politics'
    OPINION = 'opinion'
    SCIENCE = 'science'
    HEALTH = 'health'
    STYLE = 'style'
    TRAVEL = 'travel'



class BlogPost(models.Model):
    title= models.CharField(max_length= 200)
    slug = models.SlugField()
    category = models.CharField(max_length= 200,choices= Categories.choices, default=Categories.WORLD)
    thumbnail = models.ImageField(upload_to="photos/%Y/%m/%d")
    excerpt = models.CharField(max_length = 200)
    month = models.CharField(max_length = 3)
    day = models.CharField(max_length = 2)
    content = models.TextField()
    featured = models.BooleanField(default=False)
    date_created = models.DateTimeField(default = datetime.now)

    def save(self,*args,**kwargs):
        original_slug = slugify(self.title)
        queryset = BlogPost.objects.all().filter(slug__iexact = original_slug).count()
                                                    # Let's Say we create a post named First Post it will be slugified as first-post
        count = 1                                   # count is set for title
        slug = original_slug                        # Here we set slug to original slug
        while(queryset):                            # once we created a post this while loop will be executed if a post already existed with following slug
            ''' 
            Loop Hole:-
            If We override the save method. Whenever we go to our admin and change something
            the old object(which we are updating or changing) still exists because it hasn't been saved yet.That's why whenvever
            we were saving some object. It's slug usually change for nothing because the queryset
            filter object on the basis of slug = slug, and our old object still showning in the database
            Thats why our queryset sets to 1 and our slug is changed for no reason when we save the object.
            The old object get deleted from data base and the updated version of old object got new slug
            because of that one count that comes from old object.
            To solve this I (Animish Sharma) get that object that has same slug as our new or updating object
            and see if it has same id of an existing object that means it was the object we were updating, if that's true we break the while loop
            but if it does't have same id then it will get a new slug.This was the solution to this loophole
            Thank You For Reading
            {Animish Sharma}
            '''
            query = BlogPost.objects.get(slug__iexact = slug)
            if(query.id == self.id):
                break
            
            slug = original_slug + '-' + str(count) # it will set the slugified title from first-post to first-post-1
            count += 1                              # then we increment the count. if there is another post created then it will be first-post-2 because count is increased from 1 to 2
            queryset = BlogPost.objects.all().filter(slug__iexact = slug).count() # then it will fiter again to see if the slug exists for eg if
            # we created post 3rd time then running while loop first time will set count to 2 but if  exists it will run the loop again. And keeps running until it finds a unique slug url got post

        self.slug = slug # this will set django original slug to our determined slug

        if self.featured:
            try:
                temp = BlogPost.objects.get(featured=True)
                if self != temp:
                    temp.featured = False
                    temp.save()

            except BlogPost.DoesNotExist:
                pass
        
        super(BlogPost,self).save(*args,**kwargs)

    def __str__(self):
        return self.title
