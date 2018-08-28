import { Component, OnInit, OnDestroy } from "@angular/core";
import { PageEvent } from "@angular/material";
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";

import { Post } from "../post.model";
import { PostsService } from "../posts.service";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"]
})
export class PostListComponent implements OnInit, OnDestroy {
  //  posts = [
  //  { title: "First Post", content: "This is the first post content" },
  //    { title: "First Post", content: "This is the first post content" },
  //    { title: "First Post", content: "This is the first post content" }
  //  ];
  posts: Post[] = [];
  isLoading: false;
  totalPosts = 10;
  postsPerPage = 5;
  pageSizeOptions = [1, 2, 5, 10]
  private postsSub: Subscription;

  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts();
    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.isLoading = false;
        this.posts = posts;
      });
  }

  onChangedPage(pageData: PageEvent) {
    
  };

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
