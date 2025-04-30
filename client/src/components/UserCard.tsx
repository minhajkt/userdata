import React, { useEffect, useState } from "react";
import { getUsersList } from "../services/apiServices";
import { IUser } from "../interface/IUser";
import { Pagination } from "./Pagination";
import { useDebounce } from "../hooks/useDebounce";



const UserCard = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [totalCount, setTotalCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('')
  const debouncedSearch = useDebounce(searchQuery, 1000)


  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };


  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const { users, totalPages, totalCount } = await getUsersList(
          page,
          debouncedSearch
        );
        setUsers(users);
        setTotalPages(totalPages);
        setTotalCount(totalCount);
      } catch (error) {
        setError("Failed to fetch Users List");
        console.error("Failed to fetch", (error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [page, debouncedSearch]);

  return (
    <div>
      <h3>User List</h3>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search users..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {loading ? (
        <div>
          <p className="placeholder-glow">
            <span className="placeholder col-12"></span>
          </p>

          <p className="placeholder-wave">
            <span className="placeholder col-12"></span>
          </p>
        </div>
      ) : (
        <div className="d-flex flex-wrap gap-3 justify-content-center">
          {users.length
            ? users.map((user) => (
                <div
                  key={user.id}
                  style={{ width: users.length < 4 ? "260px" : "17rem" }}
                >
                  <div
                    className="card"
                    style={{ width: "17rem", padding: 0, marginBottom: "1rem" }}
                  >
                    <img
                      src="./prof.webp"
                      className="card-img-top"
                      style={{ height: "150px", objectFit: "fill" }}
                      alt="..."
                    />
                    <div
                      className="card-body"
                      style={{ backgroundColor: "#f6f6f6" }}
                    >
                      <h5 className="card-title">
                        {user.firstname} {user.lastname}
                      </h5>
                      <p className="card-text">{user.email}</p>
                      <p className="card-text">{user.phone}</p>
                    </div>
                  </div>
                </div>
              ))
            : !loading && !users.length && <p>No user Found</p>}
        </div>
      )}
      {error ? <p>{error}</p> : null}

      {!loading && users.length > 0 && (
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

export default UserCard;
